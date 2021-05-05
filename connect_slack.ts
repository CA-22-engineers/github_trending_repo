export const sendMessage = async(token: string, channel: string, blocks: string) => {
  const response = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      channel,
      blocks,
      as_user: true,
    }),
  });
  return response;
}
