"use client";
import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { addNewDuesToStoreAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";

const AddNewDuesForm = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate: createDues, isPending } = useMutation({
		mutationKey: ["createDues"],
		mutationFn: async () => await addNewDuesToStoreAction({ name, price }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getAllDues"] });
			toast({
				title: "Dues Added",
				description: "The dues has been added successfully",
			});

			setName("");
			setPrice("");
			// setImageUrl("");
		},
	});

	return (
		<>
			<p className='text-3xl tracking-tighter my-5 font-medium text-center'>
				Create New Payment
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createDues();
				}}
			>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader>
						<CardTitle className='text-2xl'>New Payment</CardTitle>
						<CardDescription>Register new dues for members.</CardDescription>
					</CardHeader>

					<CardContent className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								type='text'
								placeholder='e.g. Registeration fee'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='price'>Price (£)</Label>
							<Input
								id='price'
								type='number'
								required
								value={price}
								placeholder='14.99'
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
{/* 
						<CldUploadWidget
							signatureEndpoint={"/api/sign-image"}
							onSuccess={(result, { widget }) => {
								setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);

								widget.close();
							}}
						>
							{({ open }) => {
								return (
									<Button onClick={() => open()} variant={"outline"} type='button'>
										Upload an Image
									</Button>
								);
							}}
						</CldUploadWidget>

						{imageUrl && (
							<div className='flex justify-center relative w-full h-96'>
								<Image fill src={imageUrl} alt='Product Image' className='rounded-md object-contain' />
							</div>
						)} */}
					</CardContent>
					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? "Adding..." : "Add Product"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};
export default AddNewDuesForm;
