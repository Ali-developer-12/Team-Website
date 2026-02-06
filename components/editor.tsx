'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from "@/components/ui/toggle" // Need toggle component? Or just buttons.
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"

const Editor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 prose dark:prose-invert max-w-none"
            }
        }
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md">
            <div className="flex flex-wrap gap-1 p-1 border-b bg-muted/50">
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={<Bold className="h-4 w-4" />}
                    label="Bold"
                />
                <EditorButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={<Italic className="h-4 w-4" />}
                    label="Italic"
                />
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={<List className="h-4 w-4" />}
                    label="Bullet List"
                />
                <EditorButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={<ListOrdered className="h-4 w-4" />}
                    label="Ordered List"
                />
                <EditorButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={<Quote className="h-4 w-4" />}
                    label="Quote"
                />
            </div>
            <EditorContent editor={editor} className="p-2" />
        </div>
    )
}

function EditorButton({ onClick, isActive, icon, label }: { onClick: () => void, isActive: boolean, icon: React.ReactNode, label: string }) {
    return (
        <Button
            type="button"
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={onClick}
            title={label}
            className="h-8 w-8 p-0"
        >
            {icon}
        </Button>
    )
}

export default Editor
