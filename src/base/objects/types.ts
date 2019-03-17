export type ISeedCreator = {
  isDataExist(): Promise<boolean>;
  createSeed():  Promise<void>;
};
