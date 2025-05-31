import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const videoId = context.params.id
    const videoPath = join(process.cwd(), 'public', 'videos', `Edit ${videoId}.mp4`)
    
    // Check if file exists
    try {
      const stat = statSync(videoPath)
      const fileSize = stat.size
      const range = request.headers.get('range')

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        const chunksize = end - start + 1
        const stream = createReadStream(videoPath, { start, end })
        
        const headers = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize.toString(),
          'Content-Type': 'video/mp4',
        }

        return new NextResponse(stream as unknown as ReadableStream, {
          status: 206,
          headers: new Headers(headers),
        })
      }

      const stream = createReadStream(videoPath)
      return new NextResponse(stream as unknown as ReadableStream, {
        headers: new Headers({
          'Content-Type': 'video/mp4',
          'Content-Length': fileSize.toString(),
        }),
      })
    } catch (statError) {
      console.error('File not found:', videoPath)
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Video streaming error:', error)
    return NextResponse.json(
      { error: 'Error streaming video' },
      { status: 500 }
    )
  }
} 