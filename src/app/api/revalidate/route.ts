import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Check the secret token (set this in your .env)
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate specific paths
    revalidatePath('/');
    revalidatePath('/journal');
    revalidatePath('/journal/[slug]');

    // Add lists
    
    // Or use tags (better for large sites)
    // revalidateTag('journal');
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now() 
    });
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating' 
    }, { status: 500 });
  }
}