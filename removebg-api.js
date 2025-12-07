import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";
import { v4 as uuid } from "uuid";

export async function removeBg_API(input){
  const form=new FormData();
  form.append("image_file",fs.createReadStream(input));
  form.append("size","auto");

  const r=await fetch("https://api.remove.bg/v1.0/removebg",{
    method:"POST",
    headers:{ "X-Api-Key":process.env.REMOVEBG_API_KEY },
    body:form
  });

  if(!r.ok) throw new Error(await r.text());

  const buf=Buffer.from(await r.arrayBuffer());
  const name=uuid()+".png";
  fs.writeFileSync("static/"+name,buf);
  fs.unlinkSync(input);
  return name;
}
