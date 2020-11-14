import { adminDb } from 'service/db';

export default async function setPageViews(req, res) {
	const ref = adminDb.ref('views').child(req.query.id);
	const { snapshot } = await ref.transaction((currentViews) => {
		if (currentViews === null) {
			currentViews = 0;
		}
		return currentViews + 1;
	});

	res.status(200).json({
		total: snapshot.val(),
	});
}
