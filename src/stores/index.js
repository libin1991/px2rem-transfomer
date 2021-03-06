import { observable, computed, action } from "mobx"
import autobind from "autobind"
import * as uuid from "node-uuid"

/**
 * 过滤文件类型的后缀
 */
class FilterItem {
	constructor({title}) {
		this.title = title;
		this.id = uuid.v4();
		return this;
	}
}

class Filters {
	@observable
	filterList = [];

	@action
	addFilter(title) {
		if (title) {
			if (Array.isArray(title)) {
				title.forEach((title) => {
					this.filterList.push(new FilterItem({title}));
				});
			} else {
				this.filterList.push(new FilterItem({title}));
			}
		}
	}

	@action
	removeFilter(id) {
		this.filterList = this.filterList.filter(item => item.id !== id);
	}

	@action
	resetFilters() {
		this.filterList = [];
	}
}

class CommonStore {
	@observable
	fileExt = "css";

	@observable
	scale = 2;

	@observable
	width = 750;

	@observable
	dirPath = "";

	@observable
	distPath = "";

	@observable
	compress = false;

	@observable
	fileName = "compressed.css";

	@action
	modifyScale(scale) {
		this.scale = scale;
	}

	@action
	modifyWidth(width) {
		this.width = width;
	}

	@action
	modifyFileExt(ext) {
		this.fileExt = ext;
	}

	@action
	selectDir(dir) {
		this.dirPath = dir;
	}

	@action
	selectDistDir(dir) {
		this.distPath = dir;
	}

	@action
	toggleCompress(compress) {
		this.compress = compress;
	}

	@action
	inputFileName(name) {
		this.fileName = name;
	}
}

export const filterStore = new Filters();
export const commonStore = new CommonStore();
