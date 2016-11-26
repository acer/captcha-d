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

## /pics/<filename>
Arguments: 
    filename: 01.jpg, 02.jpg, ...., 09.jpg

returns the jpeg file. No JSON for you.
