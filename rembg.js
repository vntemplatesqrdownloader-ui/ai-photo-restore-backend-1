import { remove } from "rembg-node";
import fs from "fs";
import { v4 as uuid } from "uuid";

export async function removeBackground(input){
  const inp=fs.readFileSync(input);
  const out=await remove(inp);
  const name=uuid()+".png";
  fs.writeFileSync("static/"+name,out);
  fs.unlinkSync(input);
  return name;
}
