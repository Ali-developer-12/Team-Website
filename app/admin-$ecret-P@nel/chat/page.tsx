'use client'

import { useState, useEffect, useRef } from 'react'
import { getAdminMessages, sendAdminMessage } from "@/app/actions/admin-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, User } from "lucide-react"

interface Message {
    id: string
    content: string
    senderEmail: string
    createdAt: Date
}

export default function AdminChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    const fetchMessages = async () => {
        try {
            const data = await getAdminMessages()
            setMessages(data)
            setLoading(false)
        } catch (error) {
            console.error("Failed to fetch messages")
        }
    }

    useEffect(() => {
        fetchMessages()
        const interval = setInterval(fetchMessages, 3000) // Poll every 3 seconds
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        setSending(true)
        const result = await sendAdminMessage(newMessage)
        if (result.success) {
            setNewMessage("")
            fetchMessages() // Refresh immediately
        }
        setSending(false)
    }

    return (
        <div className="p-8 h-[calc(100vh-2rem)] flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Team Chat</h1>
                <p className="text-muted-foreground">Secure internal communication for admins.</p>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden shadow-sm">

                {/* Messages Area */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <User className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {msg.senderEmail.split('@')[0]}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <div className="ml-8 bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-gray-800 dark:text-gray-200">
                                    {msg.content}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gray-50 dark:bg-zinc-950/50 border-t border-gray-200 dark:border-zinc-800">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus-visible:ring-blue-500"
                        />
                        <Button
                            type="submit"
                            disabled={sending || !newMessage.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {sending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

import { MessageSquare } from "lucide-react"
