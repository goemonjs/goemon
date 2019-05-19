/**
 * @jest-environment node
 */

import supertest from 'supertest';
import TestHelper from '../../../../../base/utilities/test-helper';
import * as App from '../../../../../app';

describe('routes/api test', () => {

  const app = App.createApp({ isTest: true });

  let token;

  beforeAll(async () => {
    await TestHelper.initializeDB();
    const agent = await TestHelper.getAuthenticatedAgent(app);
    token = await TestHelper.getAuthToekn(agent);
  });

  afterAll(async () => {
    TestHelper.finalizeDB();
  });

  beforeEach(async () => {
  });

  test('/gapi/member addTask', async () => {

    let res = await addTask(app, 'Test caption1', false, token);
    expect(res.body.data.addTask._id).not.toBeNull();
    expect(res.body.data.addTask.caption).toEqual('Test caption1');
    expect(res.body.data.addTask.isChecked).toEqual(false);

    // Remove data
    await removeTask(app, res.body.data.addTask._id);
  });

  test('/gapi/member listTasks', async () => {
    let res1 = await addTask(app, 'Test caption1', false, token);
    let res2 = await addTask(app, 'Test caption2', false, token);
    let res3 = await listTask(app, 'createdAt_ASC');

    expect(res3.body.data.listTasks[0]).toEqual(res1.body.data.addTask);
    expect(res3.body.data.listTasks[1]).toEqual(res2.body.data.addTask);

    let res4 = await listTask(app, 'createdAt_DESC');

    expect(res4.body.data.listTasks[1]).toEqual(res1.body.data.addTask);
    expect(res4.body.data.listTasks[0]).toEqual(res2.body.data.addTask);

    let res5 = await listTaskWithLimit(app, 1, 2, 'createdAt_ASC');

    expect(res5.body.data.listTasks[0]).toEqual(res2.body.data.addTask);
    expect(res5.body.data.listTasks[1]).toBeUndefined();

    let res6 = await listTaskWithLimit(app, 0, 1, 'createdAt_ASC');

    expect(res6.body.data.listTasks[0]).toEqual(res1.body.data.addTask);
    expect(res6.body.data.listTasks[1]).toBeUndefined();

    // Clean up
    await removeTask(app, res1.body.data.addTask._id);
    await removeTask(app, res2.body.data.addTask._id);
  });

  test('/gapi/member updateTask', async () => {
    let res = await addTask(app, 'Test caption1', false, token);
    expect(res.body.data.addTask._id).not.toBeNull();
    expect(res.body.data.addTask.caption).toEqual('Test caption1');
    expect(res.body.data.addTask.isChecked).toEqual(false);

    let id = res.body.data.addTask._id;

    // Success Test
    res = await updateTask(app, id, 'Test caption2', true);
    expect(res.body.data.updateTask._id).toEqual(id);
    expect(res.body.data.updateTask.caption).toEqual('Test caption2');
    expect(res.body.data.updateTask.isChecked).toEqual(true);

    // Failed Teet
    res = await updateTask(app, 'dummyid', 'Test caption1', false);
    expect(res.body.errors[0].message).toEqual('Invalid id');
    expect(res.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');

    // Clean up
    await removeTask(app, id);
  });

  test('/gapi/member removeTask', async () => {
    let res = await addTask(app, 'Test caption1', false, token);
    expect(res.body.data.addTask._id).not.toBeNull();
    expect(res.body.data.addTask.caption).toEqual('Test caption1');
    expect(res.body.data.addTask.isChecked).toEqual(false);

    let id = res.body.data.addTask._id;

    // Success Test
    res = await removeTask(app, id);
    expect(res.body.data.removeTask).toEqual(1);

    // Failed Teet
    res = await removeTask(app, 'dummyid');
    expect(res.body.errors[0].message).toBe('Invalid id');
    expect(res.body.errors[0].extensions.code).toBe('BAD_USER_INPUT');
  });

  async function addTask(app, caption, isChecked, token) {
    return supertest(app).post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `mutation Test {
            addTask(caption: "${caption}", isChecked: ${isChecked}){
              _id,
              caption,
              isChecked,
              createdAt,
              updatedAt
            }
          }`
      })
      .expect(200);
  }

  async function removeTask(app, id) {
    return supertest(app).post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `mutation Test {
            removeTask(id: "${id}")
          }`
      })
      .expect(200);
  }

  async function updateTask(app, id, caption, isChecked) {
    return supertest(app).post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `mutation Test {
            updateTask(id: "${id}" caption: "${caption}", isChecked: ${isChecked}){
              _id,
              caption,
              isChecked,
              createdAt,
              updatedAt
            }
          }`
      })
      .expect(200);
  }

  async function listTask(app, orderBy) {
    return supertest(app).post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `query Test {
            listTasks(
              input: {
                orderBy: ${orderBy},
              }
            )
          {
            _id,
            caption,
            isChecked,
            createdAt,
            updatedAt
          }
        }`
      })
      .expect(200);
  }

  async function listTaskWithLimit(app, skip, limit, orderBy) {
    return supertest(app).post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `query Test {
            listTasks(
              input: {
                skip: ${skip},
                limit: ${limit},
                orderBy: ${orderBy},
              }
            )
          {
            _id,
            caption,
            isChecked,
            createdAt,
            updatedAt
          }
        }`
      })
      .expect(200);
  }

});
