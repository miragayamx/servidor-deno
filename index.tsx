// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const colores: any[] = [];

app.handle('/', async (req) => {
    if(req.method === 'POST'){
        const params = new URLSearchParams(new TextDecoder().decode(await Deno.readAll(req.body)));;
        const dato = params.get("color");
        colores.push(dato);
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
                    <form action="/" method="POST">
                        <div className="form-group mb-3">
                            <label htmlFor="color">Color</label>
                            <input className="form-control" id= "color" type="text" name="color" />
                        </div>
                        <button type="submit">Ingresar</button>
                    </form>
                    <ul>
                        {colores.map((color) => <li style={{color: `${color}`}}>{color}</li>)}
                    </ul>
                </body>
            </html>
        ),
    });
})


app.listen({port: 5000});