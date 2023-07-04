'use client'
import { useState } from 'react'
import * as z from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '@/components/ui/modal'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { error } from 'console'

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name must be at leaast 1 character' })
})

// validate the form using zod
export const StoreModal = () => {
	const [loading, setLoading] = useState(false)
	const storeModal = useStoreModal()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ''
		}
	})

	// handle the form
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)

			const response = await axios.post('api/stores', values)
			window.location.assign(`/${response.data.id}`)
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal
			title='Create store'
			description='Add a new store to manage products and categories'
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}>
			<div>
				<div className='py-4 space-y-4 pb-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>name</FormLabel>
										<FormControl>
											<Input
												placeholder='create '
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='space-x-2 flex items-center justify-end'>
								<Button
									variant='outline'
									onClick={storeModal.onClose}
									disabled={loading}>
									Cancel
								</Button>
								<Button
									type='submit'
									disabled={loading}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}
