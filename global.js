// console.log("IT’S ALIVE!");

function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

const ARE_WE_HOME = document.documentElement.classList.contains("home");
console.log(ARE_WE_HOME);

let pages = {
    "": "Home",
    "projects/": "Projects",
    "resume/": "Resume",
    "contact/": "Contact",
    "https://github.com/jerryyli12": "Profile",
};

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let url in pages) {
    let title = pages[url];
    url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("active");
    }
    if (a.host !== location.host) {
        a.target = '_blank';
    }
    nav.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>`
);

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
    document.documentElement.style.setProperty("color-scheme", event.target.value);
    localStorage.colorScheme = event.target.value;
});

if ("colorScheme" in localStorage) {
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}
