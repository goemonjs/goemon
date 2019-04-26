/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import  React from 'react';

export type IContextProps = {
  userType: 'guest' | 'member' | 'admin';
};

export const UserContext = React.createContext<IContextProps>({
  userType: 'guest'
});
