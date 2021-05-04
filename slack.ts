import { sendMessage } from './connect_slack.ts';
import { scrapingRepo } from './github.ts';
import 'https://deno.land/x/dotenv/load.ts';

const array = await scrapingRepo()
// const makeArray = (text: string) => {
//   return (
//     {
//       "type": "mrkdwn",
//       "text": `${text}`
//     }
//   )
// }
// const makeObject = (array: string[]): any[] => {
//   let elements: any[] = [];
//   let box: any = {
//     type: "context",
//   };
//   let blocks: any[] = [];
//   for (let i = 0; i < array.length; i++) {
//     elements?.push(makeArray(array[i]))
//   }
//   box.elements = elements
//   blocks.push(box)
//   return blocks
// }
// console.log(makeObject(array))
const slacktoken = Deno.env.get('SLACK_TOKEN')
if (slacktoken) {
  await sendMessage(slacktoken, '#bot_test',
    [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Github trending repositories*'
        }
      },
      {
        type: 'divider'
      },
    ]
  );
  // await sendMessage(slacktoken, "#bot_test", makeObject(array));
  for (let j = 0; j < 10; j++) {
    await sendMessage(slacktoken, '#bot_test',
    [
      {
        'type': 'context',
        'elements': [
          {
            'type': 'mrkdwn',
            'text': `No.${j} / ${array[j]}`
          }
        ]
      },
    ]
  );
}
}
