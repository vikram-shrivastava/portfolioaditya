import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { v2 as cloudinary } from 'cloudinary'
import Project from '@/models/projects.models';
cloudinary.config({
    cloud_name: 'dcc5th5so',
    api_key: '343818442327733',
    api_secret: 'lr9n8KgJNeAYM3GS3HOKkeB1xU8',
});
export async function POST(request) {
    await dbConnect();
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const figmaLink = formData.get('figmaLink');
        const image = formData.get('image');

        // Validate required fields
        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }
        if (!image) {
            return NextResponse.json({ error: "Image is required" })
        }
        const bytes=await image.arrayBuffer();
        const buffer=Buffer.from(bytes);
        const result=await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({folder:"next-cloudinary-uploads"},(error,result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            }).end(buffer);
        });

        if(!result||!result.secure_url){
            return NextResponse.json({error:"Image upload failed"}, {status:500});
        }
        const imageUrl = result.secure_url;
        if(!figmaLink){
            return NextResponse.json({error:"Figma link is required"},{status:400});
        }
        const newProject =await new Project({
            title,
            description,
            figmaLink,
            image: imageUrl
        });
        await newProject.save();
        // TODO: Add database operation here to save the project
        // Example: await db.projects.create({ title, description, image, figmaLink })
        if(!newProject){
            return NextResponse.json({error:"Failed to add project"}, {status:500});
        }
        return NextResponse.json(
            { message: 'Project added successfully', success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding project:', error);
        return NextResponse.json(
            { error: 'Failed to add project' },
            { status: 500 }
        );
    }
}