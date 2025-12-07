import Replicate from "replicate";
import fs from "fs";
import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

const replicate=new Replicate({auth:process.env.REPLICATE_API_TOKEN});

async function download(url){
  const r=await fetch(url);
  return Buffer.from(await r.arrayBuffer());
}

function save(buffer){
  const name=uuid()+".png";
  fs.writeFileSync("static/"+name,buffer);
  return name;
}

export async function replicateEnhance(input){
  const out=await replicate.run("tencentarc/gfpgan:9283608c...",{
    input:{img:fs.createReadStream(input),scale:2}
  });
  const url=Array.isArray(out)?out[0]:out;
  const buf=await download(url);
  fs.unlinkSync(input);
  return save(buf);
}

export async function replicateRestore(input){
  const out=await replicate.run("microsoft/bringing-old-photos-back-to-life:c75db8...",{
    input:{image:fs.createReadStream(input),with_scratch:true,HR:false}
  });
  const url=Array.isArray(out)?out[0]:out;
  const buf=await download(url);
  fs.unlinkSync(input);
  return save(buf);
}

export async function replicateUpscale(input){
  const out=await replicate.run("nightmareai/real-esrgan:42fed1c...",{
    input:{image:fs.createReadStream(input),scale:4,face_enhance:true}
  });
  const url=Array.isArray(out)?out[0]:out;
  const buf=await download(url);
  fs.unlinkSync(input);
  return save(buf);
}
