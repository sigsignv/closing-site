const error = `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body></html>
`

const robots = `User-agent: *
Disallow:

User-agent: ia_archiver
Disallow: /
`

async function handler(request: Request) {
  const uri = new URL(request.url)
  if (uri.pathname === '/robots.txt') {
    return new Response(robots)
  }
  return new Response(error, {
    status: 404,
    headers: {
      "Content-Type": "text/html",
      "X-Robots-Tag": "noindex",
    },
  })
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handler(event.request))
})
