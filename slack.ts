import { sendMessage } from "./connect_slack.ts";
import { scrapingRepo } from "./github.ts";
import "https://deno.land/x/dotenv/load.ts";

const slacktoken = Deno.env.get('SLACK_TOKEN')
if (slacktoken) {
  for (const repo of scrapingRepo()) {
    sendMessage(slacktoken, "#bot_test", repo);
  }
}
