"use server";

import { getUser } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { penceToPounds } from "@/lib/utils";
import { log } from "console";

type PostArgs = {
	text: string;
	mediaUrl?: string;
	mediaType?: "image" | "video";
	isPublic: boolean;
};

export async function createPostAction({ isPublic, mediaUrl, mediaType, text }: PostArgs) {
	const admin = await checkIfAdmin();

	if (!admin) {
		throw new Error("Unauthorized");
	}

	const newPost = await prisma.post.create({
		data: {
			text,
			mediaUrl,
			mediaType,
			isPublic,
			userId: admin.id,
		},
	});

	return { success: true, post: newPost };
}

export async function getAllDuesAction() {
	const isAdmin = await checkIfAdmin();

	if (!isAdmin) {
		throw new Error("Unauthorized");
	}

	const products = await prisma.dues.findMany();

	return products;
}

type DuesArgs = {
	name: string;
	price: string;
};

export async function addNewDuesToStoreAction({ name, price }: DuesArgs) {
	const isAdmin = await checkIfAdmin();

  log(`checking for Admin: ${isAdmin}`)

	if (!isAdmin) {
		throw new Error("Unauthorized");
	}

	if (!name || !price) {
		throw new Error("Please provide all the required fields");
	}

	const priceInCents = Math.round(parseFloat(price) * 100);

	if (isNaN(priceInCents)) {
		throw new Error("Price must be a number");
	}

	const newProduct = await prisma.dues.create({
		data: {
			// image,
			price: priceInCents,
			name,
		},
	});

	return { success: true, product: newProduct };
}

export async function toggleDuesArchiveAction(productId: string) {
	const isAdmin = await checkIfAdmin();
	if (!isAdmin) {
		throw new Error("Unauthorized");
	}

	const product = await prisma.dues.findUnique({ where: { id: productId } });

	if (!product) {
		throw new Error("Product not found");
	}

	const updatedDues = await prisma.dues.update({
		where: { id: productId },
		data: {
			isArchived: !product.isArchived,
		},
	});

	return { success: true, product: updatedDues };
}

export async function getDashboardData() {
	const totalRevenuePromise = Promise.all([
		prisma.order.aggregate({
			_sum: {
				price: true,
			},
		}),
		prisma.subscription.aggregate({
			_sum: {
				price: true,
			},
		}),
	]);

	const totalSalesPromise = prisma.order.count();
	const totalSubscriptionsPromise = prisma.subscription.count();

	const recentSalesPromise = prisma.order.findMany({
		take: 4,
		orderBy: {
			orderDate: "desc",
		},
		select: {
			user: {
				select: {
					last_name: true,
          first_name: true,
					email: true,
					picture: true,
				},
			},
			price: true,
			orderDate: true,
		},
	});

	const recentSubscriptionsPromise = prisma.subscription.findMany({
		take: 4,
		orderBy: {
			startDate: "desc",
		},
		select: {
			user: {
				select: {
          last_name: true,
          first_name: true,
          email: true,
          picture: true,
				},
			},
			price: true,
			startDate: true,
		},
	});

	// run all promises in parallel so that they don't block each other
	const [totalRevenueResult, totalSales, totalSubscriptions, recentSales, recentSubscriptions] = await Promise.all([
		totalRevenuePromise,
		totalSalesPromise,
		totalSubscriptionsPromise,
		recentSalesPromise,
		recentSubscriptionsPromise,
	]);

	const totalRevenue = (totalRevenueResult[0]._sum.price || 0) + (totalRevenueResult[1]._sum.price || 0);

	return {
    totalRevenue: penceToPounds(totalRevenue),
		totalSales,
		totalSubscriptions,
		recentSales,
		recentSubscriptions,
	};
}

async function checkIfAdmin() {
	const {user} = await getUser();

  const isAdmin = user?.role === "ADMIN" || process.env.SUPER_ADMIN_EMAIL === "info@beicraftltd.com";

  if (!user || !isAdmin) return false;

	return user;
}
