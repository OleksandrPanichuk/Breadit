'use client'

import TextAreaAutoSize from 'react-textarea-autosize'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { useCallback, useEffect, useRef, useState } from 'react'
import type EditorJS from '@editorjs/editorjs'
import { uploadFiles } from '@/lib/uploadthing'
import { title } from 'process'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'

const Editor = ({ subredditId }: { subredditId: string }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<PostCreationRequest>({
		resolver: zodResolver(PostValidator),
		defaultValues: {
			subredditId,
			title: '',
			content: null
		}
	})

	const [isMounted, setIsMounted] = useState<boolean>(false)

	const ref = useRef<EditorJS>()
	const _titleRef = useRef<HTMLTextAreaElement>(null)

	const router = useRouter()
	const pathname = usePathname()

	const { toast } = useToast()

	const { mutate: createPost } = useMutation({
		mutationFn: async ({
			title,
			content,
			subredditId
		}: PostCreationRequest) => {
			const payload: PostCreationRequest = { title, content, subredditId }
			const { data } = await axios.post('/api/subreddit/post/create', payload)
			return data
		},
		onError: () => {
			return toast({
				title: 'Something went wrong.',
				description: 'Your post was not published. Please try again.',
				variant: 'destructive'
			})
		},
		onSuccess: () => {
			// turn pathname /r/mycommunity/submit into /r/mycommunity
			const newPathname = pathname.split('/').slice(0, -1).join('/')
			router.push(newPathname)

			router.refresh()

			return toast({
				description: 'Your post has been published.'
			})
		}
	})

	const initializeEditor = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
		const Embed = (await import('@editorjs/embed')).default
		const Table = (await import('@editorjs/table')).default
		const List = (await import('@editorjs/list')).default
		const Code = (await import('@editorjs/code')).default
		const LinkTool = (await import('@editorjs/link')).default
		const InlineCode = (await import('@editorjs/inline-code')).default
		const ImageTool = (await import('@editorjs/image')).default

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor
				},
				placeholder: 'Type here to write your post...',
				inlineToolbar: true,
				data: { blocks: [] },
				tools: {
					header: Header,
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link'
						}
					},
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									const [res] = await uploadFiles([file], 'imageUploader')

									return {
										success: 1,
										file: {
											url: res.fileUrl
										}
									}
								}
							}
						}
					},
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed
				}
			})
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsMounted(true)
		}
	}, [])

	useEffect(() => {
		const init = async () => {
			await initializeEditor()

			setTimeout(() => {
				_titleRef.current?.focus()
			}, 0)
		}

		if (isMounted) {
			init()

			return () => {
				ref.current?.destroy()
				ref.current = undefined
			}
		}
	}, [isMounted, initializeEditor])

	useEffect(() => {
		if (Object.keys(errors).length) {
			for (const [_key, value] of Object.entries(errors)) {
				value
				toast({
					title: 'Something went wrong.',
					description: (value as { message: string }).message,
					variant: 'destructive'
				})
			}
		}
	}, [errors])

	const { ref: titleRef, ...rest } = register('title')

	const onSubmit = async (data: PostCreationRequest) => {
		const blocks = await ref.current?.save()

		const payload: PostCreationRequest = {
			title: data.title,
			content: blocks,
			subredditId
		}

		createPost(payload)
	}

	return (
		<div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
			<form
				id="subreddit-post-form"
				className="w-fit"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="prose prose-stone dark:prose-invert">
					<TextAreaAutoSize
						{...rest}
						ref={(e) => {
							titleRef(e)

							// @ts-ignore
							_titleRef.current = e
						}}
						placeholder="title"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
					/>
					<div id="editor" className="min-h-[500px]" />
					<p className="text-sm text-gray-500">
						Use{' '}
						<kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
							Tab
						</kbd>{' '}
						to open the command menu.
					</p>
				</div>
			</form>
		</div>
	)
}

export default Editor
