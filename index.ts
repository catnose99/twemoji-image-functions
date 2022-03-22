import type { Request, Response } from "express";
import { parse } from "twemoji-parser";
import * as http from "https";

export function twemoji(req: Request, res: Response) {
  const rawText = req.url.match(/\/([^\/]+)\.svg$/)?.[1];

  if (!rawText) {
    return res.status(400).end("Invalid URL");
  }

  const targetText = decodeText(rawText);
  if (!targetText) {
    return res.status(500).end("Failed to decode URL");
  }

  const twemojiURL = getFirstTwemojiUrl(targetText);

  if (!twemojiURL) {
    return res.status(404).end("No emoji found");
  }

  http
    .request(twemojiURL, (response) => {
      if (res.statusCode === 200) {
        res.writeHead(200, {
          "Content-Type": "image/svg+xml",
          // This enables google cloud edge cache
          "Cache-Control": "public, max-age=1209600, s-maxage=5184000",
        });
        response.pipe(res);
      } else {
        console.error(response);
        res.writeHead(500);
        res.end("Internal server error");
      }
    })
    .end();
}

// Retrieve first twemoji url with twemoji-parser.
function getFirstTwemojiUrl(text: string): null | string {
  const entities = parse(text, { assetType: "svg" });
  return entities.length === 0 ? null : entities[0].url;
}

function decodeText(raw: string): null | string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return null;
  }
}
