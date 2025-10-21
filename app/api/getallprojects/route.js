import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/projects.models';
export async function GET() {
    await dbConnect();
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}