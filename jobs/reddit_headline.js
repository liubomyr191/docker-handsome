import request from 'request'
const url = "https://www.reddit.com/r/todayilearned.json?limit=5";

export const interval = 300000;
export const promise = (fulfill, reject) => {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      for (var i = 0; i < json["data"]["children"].length; i++) {
        var child = json["data"]["children"][i];
        if(child["data"]["stickied"]) {
          continue;
        }
        fulfill({
          reddit_headline: {text: child["data"]["title"]},
          reddit_score: {number: child["data"]["score"]}
        });
        break;
      }
    } else {
      reject(error);
    }
  });
};
