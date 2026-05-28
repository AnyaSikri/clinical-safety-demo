import { NextResponse } from 'next/server';
import { generateBrief } from '@/lib/pipeline';

export async function POST(request: Request) {
  try {
    const { address } = await request.json();

    if (!address || typeof address !== 'string') {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const result = await generateBrief(address);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating brief:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate brief' },
      { status: 500 }
    );
  }
}
