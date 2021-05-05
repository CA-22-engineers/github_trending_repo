import { sendMessage } from './connect_slack.ts';
import { scrapingRepo } from './github.ts';
import 'https://deno.land/x/dotenv/load.ts';

const array = await scrapingRepo()
const makeArray = (i: number, text: string) => {
  return (
    {
      "type": "mrkdwn",
      "text": `No${i+1} \n ${text}`
    }
  )
}
const makeObject = (array: string[]) => {
  let fields: any[] = [];
  let box: any = {
    type: "section",
  };
  let blocks: any[] = [];
  for (let i = 0; i < 10; i++) {
    fields.push(makeArray(i, array[i]))
  }
  box.fields = fields
  blocks.push(box)
  return JSON.stringify(blocks)
}
const slacktoken = Deno.env.get('SLACK_TOKEN')
const d = new Date();
const y = d.getFullYear();
const m = d.getMonth();
const dt = d.getDate();
const header = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Github trending repositories*  /  ${y} ${m+1}/${dt}`
        }
      },
      {
        type: 'divider'
      },
    ]
if (slacktoken) {
  await sendMessage(slacktoken, '#bot_test', JSON.stringify(header));
  await sendMessage(slacktoken, "#bot_test", makeObject(array));
}
