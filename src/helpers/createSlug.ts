import slugify from "slugify"

export const createSlug = (payload:string)=>{

    const slug = slugify(payload, {lower:true,trim:true});
    return slug;

}