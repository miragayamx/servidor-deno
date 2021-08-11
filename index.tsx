// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const colores = [];

app.handle('/', async (req) => {
    //const cleanUrl = req.url.replace(/\//g, '');
    //const frase = new URLSearchParams(cleanUrl).get('frase');
    if(req.method === 'POST'){
        console.log(req.bodyUsed);
        console.log(req.body);
    }
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
        }),
         body: ReactDOMServer.renderToString(
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Colores</title>
                </head>
                <body>
                    <form action="http://localhost:8080/api/productos/guardar" method="POST" enctype="application/x-www-form-urlencoded">
                        <div class="form-group mb-3">
                            <label for="color">Color</label>
                            <input class="form-control" id="color" type="text" name="color" required="true" />
                        </div>
                        <button type="submit">Ingresar</button>
                    </form>
                    <ul>
                        {colores.map((color) => <li style={color}>{color}</li>)}
                    </ul>
                </body>
            </html>
        ),
    });
})


app.listen({port: 5000});