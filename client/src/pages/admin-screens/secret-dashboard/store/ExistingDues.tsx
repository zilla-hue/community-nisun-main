"use client";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { getAllDuesAction } from "../actions";

const ExistingDues = () => {
	const { data: dues, isLoading } = useQuery({
		queryKey: ["getAllDues"],
		queryFn: async () => await getAllDuesAction(),
	});

	return (
		<>
			<p className='text-3xl tracking-tighter my-3 font-medium'>Existing Payment</p>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{dues?.map((due) => (
					<ProductCard adminView key={due.id} product={due} />
				))}
			</div>

			{!isLoading && dues?.length === 0 && (
				<div className='flex flex-col items-center justify-center mt-10 p-6 bg-secondary rounded-lg shadow-md'>
					<X className='h-16 w-16 text-red-600' />
					<p className='text-center text-xl text-red-600 font-semibold mt-4'>No dues found</p>
					<p className='text-center text-md text-gray-500 mt-2'>Please add new products to see them here.</p>
				</div>
			)}

			{isLoading && (
				<div className='flex flex-wrap gap-10 justify-start'>
					{[...Array(3)].map((_, i) => (
						<ProductSkeleton key={i} />
					))}
				</div>
			)}
		</>
	);
};
export default ExistingDues;
