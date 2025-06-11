import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
    	{ name: "Kasim", age: 78, isActive: true },
    	{ name: "Max", age: 34, isActive: false },
    	{ name: "Mia", age: 54, isActive: false },
    	{ name: "Rosa", age: 72, isActive: true },
    	{ name: "Raul", age: 45, isActive: false },
  	]);

	const posts = await getCollection('blog');

	await db.insert(Posts).values(
		posts.map(({ data, id }) => ({
			id: id,
			title: data.title,
			likes: Math.round(Math.random() * 100)
		}))
	);

	console.log("Seed executed!")
}
