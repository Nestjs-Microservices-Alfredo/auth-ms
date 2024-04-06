import * as bcrypt from 'bcrypt';

export const setPassword = ( password: string): string => bcrypt.hashSync( password, 10 );

export const getPassword = ( password: string, passSave: string): boolean => bcrypt.compareSync( password, passSave );

export const getRandomInt = ( value: string = '', max: number = 10, forInt: number = 10 ): string => {
    
    for (let i = 0; i < forInt; i++) {
      value += Math.floor(Math.random() * max);
    }
    return value;
}
