#acer serves ad
not really. Python Flask that serves fake ads

## Dependancies
- python 
- pip
- virtualenv

## GET - /api/ad
no arguments.

Response: 200
```
{
    picture : "http://url.to/picture.jpeg",
    url: "https://url.to/url"
}
```

## /pics/\{filename\}
Arguments:
- filename: get from /api/ad

serves a picture. No JSON for you.
