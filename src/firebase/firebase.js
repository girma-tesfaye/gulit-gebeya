import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import {defaultShopSchema, initialShopOrdersStateSchema, initialShopPrivateSchema} from '../helpers/schema';

var firebaseConfig = {
    apiKey: "AIzaSyDMW0lFTdn2FgRhqs1R6l29B3lp51N7NDQ",
    authDomain: "my-react-test-640c2.firebaseapp.com",
    projectId: "my-react-test-640c2",
    storageBucket: "my-react-test-640c2.appspot.com",
    messagingSenderId: "135766216944",
    appId: "1:135766216944:web:774d23b140e0170ff5b235",
    measurementId: "G-HCMLGF0TX2"
  };

  class Firebase {
	constructor() {
		app.initializeApp(firebaseConfig);

		this.storage = app.storage();
		this.db = app.firestore();
		this.auth = app.auth();
	}

	// AUTH ACTIONS 
	// --------

	createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

	phoneSignUp = (phone, password) => this.auth.createUserWithPhoneAndPassword(phone, password);

	signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

	phoneSignIn = (phone, password) => this.auth.signInWithPhoneAndPassword(phone, password);
	
	signInWithGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

	signInWithFacebook = () => this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

	signInWithGithub = () => this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

	signOut = () => this.auth.signOut();

	onAuthStateChanged = () => {
		return new Promise((resolve, reject) => {
			this.auth.onAuthStateChanged((user) => {
				if (user) {
					resolve(user);
				} else {
					reject(new Error('Auth State Changed failed'));
				}
			});
		});
	}

	passwordReset = email => this.auth.sendPasswordResetEmail(email, {url: 'https://my-react-test-640c2.web.app/signin'});

	phonePasswordReset = phone => this.auth.sendPasswordResetPhone(phone, {url: 'https://my-react-test-640c2.web.app/signin'});

	setAuthPersistence = () => this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

	// PROFILE ACTIONS   
	// --------

	addUser = (id, user) => this.db.collection('users').doc(id).set(user);

	getUserShop = id => this.db.collection('shop').doc(id).get();

	addUserShop = (id, userShop) => this.db.collection('shop').doc(id).set(userShop);

	getUser = id => this.db.collection('users').doc(id).get();

	updateEmail = (currentPassword, newEmail) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updateEmail(newEmail).then(() => {
					resolve('Email Successfully updated');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	updatePhone = (currentPassword, newPhone) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updateEmail(newPhone).then(() => {
					resolve('Your Phone Number Successfully updated');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	getCategorys = () => {
		return new Promise((resolve, reject) => {
			this.db.collection('utils').doc('ui').get()
			.then((doc) => {
				if (doc.exists) {
					resolve(doc.data);
					console.log(doc.data)
				}	else {
					reject('no such document');
				}			
					
				}).catch(error =>reject(error));
				
				});
	}

	updateProfile = (id, updates) => this.db.collection('users').doc(id).update(updates);

	updateShopProfile = (id, updates) => this.db.collection('shop').doc(id).update(updates);

	passwordUpdate = password => this.auth.currentUser.updatePassword(password);

	phonePasswordUpdate = password => this.auth.currentUser.updatePhonePassword(password);

	changePassword = (currentPassword, newPassword) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updatePassword(newPassword).then(() => {
					resolve('Password updated successfully!');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	changePhonePassword = (currentPassword, newPassword) => {
		return new Promise((resolve, reject) => {
			this.reauthenticate(currentPassword).then(() => {
				const user = this.auth.currentUser;
				user.updatePhonePassword(newPassword).then(() => {
					resolve('Password updated successfully!');
				}).catch(error => reject(error));
			}).catch(error => reject(error));
		});
	}

	reauthenticate = (currentPassword) => {
		const user = this.auth.currentUser;
		const cred = app.auth.EmailAuthProvider.credential(user.email, currentPassword);

		return user.reauthenticateWithCredential(cred);
	}	

	reauthenticate = (currentPassword) => {
		const user = this.auth.currentUser;
		const cred = app.auth.PhoneAuthProvider.credential(user.phone, currentPassword);

		return user.reauthenticateWithCredential(cred);
	}	

	saveBasketItems = (items, userId) => this.db.collection('users').doc(userId).update({ basket: items });

	saveWishListItems = (items, userId) => this.db.collection('users').doc(userId).update({ wishList: items })
	;

	getWishList = (id) => this.db.collection('users').doc(id).collection('wishList').doc(this.auth.currentUser.uid).get();

	// order actions

	//placeUserOrder = (userId, user_order, batch) => batch.update(this.db.collection('users').doc(userId),{ currentOrders: app.firestore.FieldValue.arrayUnion(user_order)});

	placeOrder = (order, key) => this.db.collection('orders').doc(key).set(order);
	
	getSingleOrder = (id) => this.db.collection('orders').doc(id).get();

	getOrders = (lastRefKey) => {
		let didTimeout = false;		
		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db
						.collection('orders')
						.where('buyer', '==' , this.auth.currentUser.uid)
						.orderBy('orderedAt', 'desc')						
						.startAfter(lastRefKey)
						.limit(8);

					const snapshot = await query.get();
					const orders = [];
					snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ orders, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch orders.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('orders').where('buyer', '==', this.auth.currentUser.uid).get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('orders').where('buyer', '==', this.auth.currentUser.uid).orderBy('orderedAt', 'desc').limit(8);
					const snapshot = await query.get();
					
					clearTimeout(timeout);
					if (!didTimeout) {
						const orders = [];
						snapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						//console.log('get into the firebase');
						//console.log(products);
						resolve({ orders, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch orders: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch orders.'));
				}
			}
		});
	}


	// review actions

	getReviews = (lastRefKey, productId) => {
		let didTimeout = false;
		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db
						.collection('products')
						.doc(productId)
						.collection('reviews')
						.orderBy('lastUpdate', 'desc')
						.startAfter(lastRefKey)
						.limit(4);

					const snapshot = await query.get();
					const reviews = [];
					snapshot.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ reviews, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch reviews.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('products').doc(productId).collection('reviews').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('products').doc(productId).collection('reviews').orderBy('lastUpdate', 'desc').limit(4);
					const snapshot = await query.get();

					clearTimeout(timeout);
					if (!didTimeout) {
						const reviews = [];
						snapshot.forEach(doc => reviews.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						//console.log('get into the firebase');
						//console.log(products);
						resolve({ reviews, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch orders: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch orders.'));
				}
			}
		});
	}

	getUserReview = (productId) => this.db.collection('products').doc(productId).collection('reviews').doc(this.auth.currentUser.uid).get();

	userLastReview = (id) => {
		return new Promise(async (resolve, reject) => {
			this.db.collection('products').doc(id).collection('reviews').doc(this.auth.currentUser.uid).get()
				.then((doc) => {
					if (doc.exists) {
						const data = doc.data()
						resolve(data);
					} else {

						console.log("No such document!");
						resolve(null);
						//reject(new Error(':( No such document!'));
					}
				})
				.catch((e) => {
					reject(new Error(':( Failed to fetch users.'));
				});
		});
	}

	// // PRODUCT ACTIONS
	// // ---------


	getProducts = (lastRefKey) => {
		let didTimeout = false;		
		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db
						.collection('products')
						.orderBy(app.firestore.FieldPath.documentId())
						.startAfter(lastRefKey)
						.limit(15);

					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('products').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).limit(15);
					const snapshot = await query.get();
					
					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						//console.log('get into the firebase');
						//console.log(products);
						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	getProductsWithFilter = (lastRefKey) => {
		let didTimeout = false;		
		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db
						.collection('products')
						.orderBy(app.firestore.FieldPath.documentId())
						.startAfter(lastRefKey)
						.limit(15);

					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('products').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('products').orderBy(app.firestore.FieldPath.documentId()).limit(15);
					const snapshot = await query.get();
					
					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						//console.log('get into the firebase');
						//console.log(products);
						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	addProduct = (productId, product, callback) => {
		var shopRef = this.db.collection('shop').doc(this.auth.currentUser.uid);

		this.db.runTransaction((t) => {
			return t.get(shopRef).then((res) => {
				if (!res.exists) {
					return Promise.reject('You have not created shop! please create shop first.');
				} else {
					const shop = res.data();

					t.set(this.db.collection('products').doc(productId), product)

					return ({ state: 'success', discription: 'Product added successfully!', product: product });
				}
			});
		}).then((result) => {
			console.log("Success add product result: ", result);
			callback(result);
		}).catch((err) => {
			console.error("Error add product result: ", err);
			callback(err);
		});
	}

	/* addProduct = (id, product) => this.db.collection('products').doc(id).set(product); */	

	addProductToShop = (userId , productId , product) => this.db.collection('shop').doc(userId).collection('products').doc(productId).set(product);

	generateKey = () => this.db.collection('products').doc().id;

	storeImage = async (id, folder, imageFile) => {
		const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
		const downloadURL = await snapshot.ref.getDownloadURL();

		return downloadURL;
	}

	storeCatagories = async (id, folder, catagoriesFile) => {
		const snapshot = await this.storage.ref(folder).child(id).put(catagoriesFile);
		const downloadURL = await snapshot.ref.getDownloadURL();

		return downloadURL;
	}

	deleteImage = (id,folder) => this.storage.ref(folder).child(id).delete();

	editProduct = (id, updates) => this.db.collection('products').doc(id).update(updates);

	editcategory = (id, updates) => this.db.collection('categorys').doc(id).update(updates);

	removeProduct = id => this.db.collection('products').doc(id).delete();

	removecategory = id => this.db.collection('categorys').doc(id).delete();

	removeProductFromShop = (id,userId) => this.db.collection('shop').doc(userId).collection('products').doc(id).delete();

	searchProducts = (searchKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			let productsRef = this.db.collection('products');

			const timeout = setTimeout(() => {
				didTimeout = true;
				reject('Request timeout, please try again');
			}, 1500000);

			try {
				// const totalQueryRef = productsRef
				// 	.where('name_lower', '>=', searchKey)
				// 	.where('name_lower', '<=', searchKey + '\uf8ff');
				const searchedNameRef = productsRef
					.orderBy('name_lower')
					.where('name_lower', '>=', searchKey)
					.where('name_lower', '<=', searchKey + '\uf8ff')
					.limit(15);
				
				 const searchedKeywordsRef = productsRef
					//.orderBy('dateAdded', 'desc')
					.where('keywords', 'array-contains-any', searchKey.split(' '))
					.limit(15) 
				
				// const totalResult = await totalQueryRef.get();
				const nameSnaps = await searchedNameRef.get();
				const keywordsSnaps = await searchedKeywordsRef.get();
				// const total = totalResult.docs.length;
				
				clearTimeout(timeout);
				if (!didTimeout) {
					const searchedNameProducts = [];
					const searchedKeywordsProducts = [];
					let lastKey = null;

					if (!nameSnaps.empty) {
						nameSnaps.forEach(doc => searchedNameProducts.push({ id: doc.id, ...doc.data() }));
						lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
					}

					if (!keywordsSnaps.empty) {
						keywordsSnaps.forEach(doc => searchedKeywordsProducts.push({ id: doc.id, ...doc.data() }));
					}

					// MERGE PRODUCTS
					const mergedProducts = [...searchedNameProducts, ...searchedKeywordsProducts];
					const hash = {};

					mergedProducts.forEach(product => {
						hash[product.id] = product;
					});					

					resolve({ products: Object.values(hash), lastKey });
				}
			} catch (e) {
				if (didTimeout) return;
				console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
				reject(':( Failed to fetch products.');
			}

		});
	}

	searchCategoryProducts = (searchKey) => {
		let didTimeout = false;

		return new Promise(async (resolve, reject) => {
			let productsRef = this.db.collection('products');

			const timeout = setTimeout(() => {
				didTimeout = true;
				reject('Request timeout, please try again');
			}, 1500000);

			try {
				// const totalQueryRef = productsRef
				// 	.where('name_lower', '>=', searchKey)
				// 	.where('name_lower', '<=', searchKey + '\uf8ff');
				const searchedNameRef = productsRef
					.orderBy(app.firestore.FieldPath.documentId())					
					.where('category', '==', searchKey)
					.limit(15);				
				
				const nameSnaps = await searchedNameRef.get();			
				
				clearTimeout(timeout);
				if (!didTimeout) {
					const searchedNameProducts = [];					
					let lastKey = null;

					if (!nameSnaps.empty) {
						nameSnaps.forEach(doc => searchedNameProducts.push({ id: doc.id, ...doc.data() }));
						lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
					}					
					
					const hash = {};

					searchedNameProducts.forEach(product => {
						hash[product.id] = product;
					});					

					resolve({ products: Object.values(hash), lastKey });
				}
			} catch (e) {
				if (didTimeout) return;
				console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
				reject(':( Failed to fetch products.');
			}

		});
	} 	

	getAdminProducts = (lastRefKey, userId) => {
		let didTimeout = false;		
		return new Promise(async (resolve, reject) => {
			if (lastRefKey) {
				try {
					const query = this.db
						.collection('shop').doc(userId).collection('products')
						.orderBy(app.firestore.FieldPath.documentId())
						.startAfter(lastRefKey)
						.limit(15);

					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await this.db.collection('shop').doc(userId).collection('products').get();
					const total = totalQuery.docs.length;
					const query = this.db.collection('shop').doc(userId).collection('products').orderBy(app.firestore.FieldPath.documentId()).limit(6);
					const snapshot = await query.get();
					
					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						//console.log('get into the firebase');
						//console.log(products);
						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	// shop actions

	updateShopProfile = (id, updates) => this.db.collection('shop').doc(id).update(updates);

	addShop = (id, userShop) => this.db.collection('shop').doc(id).set

	getProduct = (id) => this.db.collection('products').doc(id).get();

	getCategory = (id) => this.db.collection('categorys').doc(id).get();

	getShop = (id) => this.db.collection('shop').doc(id).get();

	getShops = (itemsCount = 12) => this.db.collection('shop').orderBy('shopDateCreated', 'desc').limit(itemsCount).get();				// add some thing to filter the shops likee .where('isFeatured', '==', true)

	// searchProduct = (keyword) => this.db.collection('products').where('name_lower', '>=', keyword).where('name_lower', '<=', keyword + '\uf8ff').get();

	getBestProducts = (itemsCount = 12) => this.db.collection('products').where('isBestProduct', '==', true).limit(itemsCount).get(); 

	getFeaturedProducts = (itemsCount = 12) => this.db.collection('products').where('isFeatured', '==', true).limit(itemsCount).get();	
	
	getPreparedProducts = (itemsCount = 12) => this.db.collection('products').where('preparedToDelivery', '==', true).limit(itemsCount).get();	

	getOrginalProducts = (itemsCount = 12) => this.db.collection('products').where('isOrginal', '==', true).limit(itemsCount).get();	


	getRecommendedProducts = (itemsCount = 12) => this.db.collection('products').where('isRecommended', '==', true).limit(itemsCount).get();

	getCategorys = () => this.db.collection('utills').doc('categorys').get();

	getProductsMaster = (payload) => {
		let didTimeout = false;

		let usersRef = this.db.collection('products');

		usersRef = ((payload.isAdmin == true) ? usersRef : usersRef.where('isApproved', '==', 'APPROVED'));
		usersRef = ((payload.productOwner && payload.productOwner !== '') ? usersRef.where('productOwner', '==', payload.productOwner) : usersRef);
		usersRef = (payload.isFeatured ? usersRef.where('isFeatured', '==', true) : usersRef);
		usersRef = (payload.isRecommended ? usersRef.where('isRecommended', '==', true) : usersRef);
		usersRef = (payload.isOrginal ? usersRef.where('isOrginal', '==', true) : usersRef);       // note use isOrginal as admin confirmation about the orginality
		usersRef = (payload.preparedToDelivery ? usersRef.where('preparedToDelivery', '==', true) : usersRef);

		usersRef = (payload.isBestProduct ? usersRef.where('isBestProduct', '==', true) : usersRef);

		usersRef = ((payload.category && payload.category !== '') ? usersRef.where('category', '==', payload.category) : usersRef);
		usersRef = ((payload.subCategory && payload.subCategory !== '') ? usersRef.where('subCategory', '==', payload.subCategory) : usersRef);
		usersRef = ((payload.brand && payload.brand !== '') ? usersRef.where('brand', '==', payload.brand) : usersRef);

		usersRef = (payload.minPrice ? usersRef.where('price', '>=', payload.minPrice) : usersRef);
		usersRef = ((payload.maxPrice && payload.maxPrice !== 0) ? usersRef.where('price', '<=', payload.maxPrice) : usersRef);

		usersRef = ((payload.keyword && payload.keyword !== '' && !payload.size && (payload.size === '')) ? usersRef.where('keywords', 'array-contains-any', payload.keyword.split(' ')) : usersRef);
		usersRef = ((payload.size && payload.size !== '') ? usersRef.where('availableSizes', 'array-contains-any', payload.size.split(' ')) : usersRef);

		usersRef = ((payload.minPrice || payload.maxPrice) ?
			usersRef.orderBy('price', 'asc')
			: (payload.sortBy === 'date-asc' ?
				usersRef.orderBy('dateAdded', 'asc')
				: (payload.sortBy === 'date-desc' ?
					usersRef.orderBy('dateAdded', 'desc')
					: (payload.sortBy === 'price_high_to_low' ?
						usersRef.orderBy('price', 'desc')
						: (payload.sortBy === 'price_low_to_high' ?
							usersRef.orderBy('price', 'asc')
							: (payload.sortBy === 'highest_avgRating' ?
								usersRef.orderBy('avgRating', 'desc')
								: (payload.sortBy === 'highest_numRatings' ?
									usersRef.orderBy('numRatings', 'desc')
									: (payload.sortBy === 'highest_totalSells' ?
										usersRef.orderBy('totalSells', 'desc')
										: usersRef.orderBy('dateAdded', 'desc')
									)
								)
							)
						)
					)
				)
			)
		);

		return new Promise(async (resolve, reject) => {
			if (payload.lastRefKey) {
				try {
					const query = usersRef
						.startAfter(payload.lastRefKey)
						.limit(payload.limit ? payload.limit : 12);

					const snapshot = await query.get();
					const products = [];
					snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ products, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch products.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await usersRef.get();
					const total = totalQuery.docs.length;
					const query = usersRef.limit(payload.limit ? payload.limit : 12);
					const snapshot = await query.get();

					clearTimeout(timeout);
					if (!didTimeout) {
						const products = [];
						snapshot.forEach(doc => products.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						resolve({ products, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

	getUiUtills = () => {
		return new Promise(async (resolve, reject) => {
			this.db.collection('utills').doc('ui').get()
				.then((doc) => {
					if (doc.exists) {
						const data = doc.data()					
						resolve(data);																
					} else {
						console.log("No such document!");						
						//reject(new Error(':( No such document!'));
					}
				})
				.catch((e) => {
					reject(new Error(':( Failed to fetch users.'));
				});		
		});
	}

	editUtilsUi = (updates) => this.db.collection('utills').doc('ui').update(updates);

	
	//delete the image folder add here
	/* deleteFolderContents(path) {
        const ref = this.storage().ref(path);
		console.log(ref);
        ref.listAll()
          .then((dir) => {console.log('we in 1');
            dir.items.forEach(fileRef => {
				console.log('we in 2');
			  this.storage().ref(ref.fullPath).child(fileRef.name).delete();
            });
            dir.prefixes.forEach(folderRef => {console.log('we in 3');
              this.deleteFolderContents(folderRef.fullPath);			  
            })
          })
          .catch(error => {
            console.log(error);
          });
      }  */
      

	//deleteImage = id => this.storage.ref(id).child().delete(); 
	
	// admin_admin 

	adminAdminOpenShop = (sellerId, callback) => {
		const userRef = this.db.collection('users').doc(sellerId);
		const shopRef = this.db.collection('shops').doc(sellerId);
		const shopPrivateRef = shopRef.collection('private').doc('shopPrivate');
		const shopOrdersStateRef = shopRef.collection('shopOrders').doc('--state--');		

		this.db.runTransaction((t) => {
			return t.get(userRef).then((res) => {
				let userDoc = res.data();
				if(!userDoc){
					// user has no data this means it may be that the user is not create account!
					return Promise.reject({message : "The user has no data. he may have no account !"});
				}else if(userDoc.role !== 'USER'){
					// the user has role other than user so this user is no eligeble to be a seller!
					return Promise.reject({message : "The user already has role other than USER. thus only USERs can became a seller !"});
				}else{
					let timeKnow = app.firestore.FieldValue.serverTimestamp() || new Date().getTime();
					const defaultShop = defaultShopSchema(userDoc, sellerId, timeKnow);
					const initialShopOrdersState = initialShopOrdersStateSchema();
					const initialShopPrivate = initialShopPrivateSchema(sellerId, this.auth.currentUser.uid);

					// make user admin
					t.update(userRef, {
						role:'ADMIN'
					});					

					// create shop 
					t.set(shopRef, defaultShop);

					// create shop private
					t.set(shopPrivateRef, initialShopPrivate);

					// create initial shop orders state
					t.set(shopOrdersStateRef, initialShopOrdersState);
					return ({ state: 'success', message: 'The user role changed to ADMIN and Shop created successfully!' });
				}				
			});
		}).then((result) => {
			console.log("Shop created successfully: ", result);
			callback(result);
		}).catch((err) => {
			// This will be an "population is too big" error.
			console.error("Error while creating shop: ", err);
			callback({state: 'fail', message: err.message});
		});
	}

	
	getAdminAdminUsers = (payload) => {
		let didTimeout = false;	
		let usersRef = 	this.db.collection('users');
		usersRef = (payload.sort === 'date-asc'?
						usersRef.orderBy('dateJoined', 'asc')
						:(payload.sort === 'name-asc'?
							usersRef.orderBy('fullname', 'asc')
							:(payload.sort === 'name-desc'?
								usersRef.orderBy('fullname', 'desc'):
								usersRef.orderBy('dateJoined', 'desc')
							)
						)
					);
		usersRef = (payload.userRole?usersRef.where('role', '==', payload.userRole):usersRef);
		usersRef = (payload.userDateJoinedAbove?usersRef.where('dateJoined', '>=', payload.userDateJoinedAbove):usersRef);
		usersRef = (payload.userDateJoinedBelow?usersRef.where('dateJoined', '<=', payload.userDateJoinedBelow):usersRef);
		console.log(payload.lastRefKey);
		return new Promise(async (resolve, reject) => {
			if (payload.lastRefKey) {
				try {
					const query = usersRef
						.startAfter(payload.lastRefKey)
						.limit(payload.limit?payload.limit:12);

					const snapshot = await query.get();
					const users = [];
					snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];

					resolve({ users, lastKey });
				} catch (e) {
					reject(new Error(':( Failed to fetch users.'));
				}
			} else {
				const timeout = setTimeout(() => {
					didTimeout = true;
					reject(new Error('Request timeout, please try again'));
				}, 15000);

				try {
					const totalQuery = await usersRef.get();
					const total = totalQuery.docs.length;
					const query = usersRef.limit(payload.limit?payload.limit:12);
					const snapshot = await query.get();
					
					clearTimeout(timeout);
					if (!didTimeout) {
						const users = [];
						snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
						const lastKey = snapshot.docs[snapshot.docs.length - 1];
						
						resolve({ users, lastKey, total });
					}
				} catch (e) {
					if (didTimeout) return;
					console.log('Failed to fetch products: An error occured while trying to fetch products or there may be no product ', e);
					reject(new Error(':( Failed to fetch products.'));
				}
			}
		});
	}

}

/*getShopsMaster = (payload) => {
	let didTimeout = false;

	let usersRef = this.db.collection('shop');

	usersRef = ((payload.shopCity && payload.shopCity !== '') ? usersRef.where('shopCity', '==', payload.shopCity) : usersRef);

	usersRef = ((payload.keyword && payload.keyword !== '') ? usersRef.where('keywords', 'array-contains-any', payload.keyword.split(' ')) : usersRef);
	usersRef = ((payload.shopCategory && payload.shopCategory !== '') ? usersRef.where('shopCategorys', 'array-contains-any', payload.shopCategory) : usersRef);
	usersRef = ((payload.adminConfirm && payload.adminConfirm !== '') ? usersRef.where('adminConfirms', 'array-contains-any', payload.adminConfirm) : usersRef);

	usersRef =
		(payload.sortBy === 'date-asc' ?
			usersRef.orderBy('shopDateCreated', 'asc')
			: (payload.sortBy === 'date-desc' ?
				usersRef.orderBy('shopDateCreated', 'desc')
				: (payload.sortBy === 'highest_avgRating' ?
					usersRef.orderBy('avgRating', 'desc')
					: (payload.sortBy === 'highest_numRatings' ?
						usersRef.orderBy('numRatings', 'desc')
						: (payload.sortBy === 'highest_totalSells' ?
							usersRef.orderBy('totalSells', 'desc')
							: usersRef.orderBy('shopDateCreated', 'desc')
						)
					)
				)
			)
		);


	return new Promise(async (resolve, reject) => {
		if (payload.lastRefKey) {
			try {
				const query = usersRef
					.startAfter(payload.lastRefKey)
					.limit(payload.limit ? payload.limit : 12);

				const snapshot = await query.get();
				const shops = [];
				snapshot.forEach(doc => shops.push({ id: doc.id, ...doc.data() }));
				const lastKey = snapshot.docs[snapshot.docs.length - 1];

				resolve({ shops, lastKey });
			} catch (e) {
				reject(new Error(':( Failed to fetch shops.'));
			}
		} else {
			const timeout = setTimeout(() => {
				didTimeout = true;
				reject(new Error('Request timeout, please try again'));
			}, 15000);

			try {
				const totalQuery = await usersRef.get();
				const total = totalQuery.docs.length;
				const query = usersRef.limit(payload.limit ? payload.limit : 12);
				const snapshot = await query.get();

				clearTimeout(timeout);
				if (!didTimeout) {
					const shops = [];
					snapshot.forEach(doc => shops.push({ id: doc.id, ...doc.data() }));
					const lastKey = snapshot.docs[snapshot.docs.length - 1];
					resolve({ shops, lastKey, total });
				}
			} catch (e) {
				if (didTimeout) return;
				console.log('Failed to fetch shops: An error occured while trying to fetch shops or there may be no shop ', e);
				reject(new Error(':( Failed to fetch shops.'));
			}
		}
	});
}

 addRating = (productId, userId, review) => {
	// Create a reference for a new rating, for use inside the transaction
	var ratingRef = this.db.collection('products').doc(productId).collection('reviews').doc(userId);
	var productRef = this.db.collection('products').doc(productId);

	return this.db.runTransaction((t) => {
		return t.get(ratingRef).then((res) => {
			if (!res.exists) {
				t.update(productRef,
					{
						'numRatings': app.firestore.FieldValue.increment(1),
						'avgRating': app.firestore.FieldValue.increment(review.rating),
					})
			} else {
				let increment = (review.rating) - (res.data().rating)
				t.update(productRef,
					{
						'avgRating': app.firestore.FieldValue.increment(increment),
					})
			}

			t.set(ratingRef, review);
		});
	});
} */

/* addRating = (productId, userId, review) => {
	// Create a reference for a new rating, for use inside the transaction
	var ratingRef = this.db.collection('products').doc(productId).collection('reviews').doc(userId);
	var productRef = this.db.collection('products').doc(productId);
	
	return this.db.runTransaction((t) => {
		return t.get(ratingRef).then((res) => {
			if (!res.exists) {					
				t.update(productRef,
					{							
						'numRatings': app.firestore.FieldValue.increment(1),
						'avgRating': app.firestore.FieldValue.increment(review.rating),
					})
			}else{					
				let increment = (review.rating) - (res.data().rating)
				t.update(productRef,
					{							
						'avgRating': app.firestore.FieldValue.increment(increment),
					})
			}
			
			t.set(ratingRef, review);
		});
	});
} */


const firebase = new Firebase();

// If you want to add a new field to every single document, run this
// delete or comment after first run or it may override what you have edited on first run.

// (async function () {
// 	const col = await firebase.db.collection('products').get();
// 	col.forEach((doc) => {
// 		doc.ref.update({
// 			isRecommended: false
// 		});
// 	})
// })()

export default firebase;