export namespace pkg {
	
	export class ImportResp {
	    Err: any;
	    List: string[];
	
	    static createFrom(source: any = {}) {
	        return new ImportResp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Err = source["Err"];
	        this.List = source["List"];
	    }
	}

}

