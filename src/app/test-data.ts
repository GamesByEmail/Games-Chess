import {
  IStartGame,
  testMes
} from '@gamesbyemail/base';


export const testData:{[key:string]:IStartGame} = {
  chess: {
    title: "Chess game",
    teams: [
      {
        title: "White",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Black",
        player: {
          user: undefined
        }
      }
    ],
    options: {}
  },
  darkChess: {
    title: "Dark Chess game",
    teams: [
      {
        title: "White",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Black",
        player: {
          user: undefined
        }
      }
    ],
    options: {
      dark: "true"
    }
  }
};
