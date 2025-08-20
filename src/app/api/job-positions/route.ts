import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('job_positions')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch job positions' },
        { status: 500 }
      );
    }

    return NextResponse.json({ jobPositions: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      department, 
      location, 
      type, 
      experience_level, 
      description, 
      requirements, 
      responsibilities, 
      benefits, 
      salary_range, 
      is_active 
    } = body;

    // Validate required fields
    if (!title || !type || !experience_level || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert job position into database
    const { data, error } = await supabase
      .from('job_positions')
      .insert([
        {
          title,
          department: department || null,
          location: location || null,
          type,
          experience_level,
          description,
          requirements: requirements || [],
          responsibilities: responsibilities || [],
          benefits: benefits || [],
          salary_range: salary_range || null,
          is_active: is_active !== undefined ? is_active : true
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create job position' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job position created successfully',
        data 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      title, 
      department, 
      location, 
      type, 
      experience_level, 
      description, 
      requirements, 
      responsibilities, 
      benefits, 
      salary_range, 
      is_active 
    } = body;

    // Validate required fields
    if (!id || !title || !type || !experience_level || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update job position in database
    const { data, error } = await supabase
      .from('job_positions')
      .update({
        title,
        department: department || null,
        location: location || null,
        type,
        experience_level,
        description,
        requirements: requirements || [],
        responsibilities: responsibilities || [],
        benefits: benefits || [],
        salary_range: salary_range || null,
        is_active: is_active !== undefined ? is_active : true
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update job position' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job position updated successfully',
        data 
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Job position ID is required' },
        { status: 400 }
      );
    }

    // Delete job position from database
    const { error } = await supabase
      .from('job_positions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete job position' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Job position deleted successfully'
      }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
