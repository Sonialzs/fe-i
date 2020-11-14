import { adminDb } from 'service/db';

export default (req, res) => {
	if (!req.query.id) {
		return adminDb.ref('views').once('value', (snapshot) => {
			const views = snapshot.val();
			const allViews = Object.values(views).reduce(
				// @ts-ignore
				(total, value) => total + value
			);

			return res.status(200).json({
				total: allViews,
			});
		});
	}

	const ref = adminDb.ref('views').child(req.query.id);

	return ref.once('value', (snapshot) => {
		res.status(200).json({
			total: snapshot.val(),
		});
	});
};
