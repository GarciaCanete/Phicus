export const DeleteInLocalStorage = name => {
	localStorage.removeItem(name);
};

export const SaveInLocalStorage = (name, props) => {
	localStorage.setItem(name, JSON.stringify(props));
};

export const GetInLocalStorage = name => {
	return JSON.parse(localStorage.getItem(name));
};
