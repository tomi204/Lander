// import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request) {
  const { text, txId } = await req.json()

  pusherServer.trigger(txId, 'incoming-message', text)

  // await db.message.create({
  //   data: {
  //     text,
  //     chatRoomId: roomId,
  //   },
  // })

  return new Response(JSON.stringify({ success: true }))
}