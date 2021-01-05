import Block from "../block";
import template from "./template";

interface Props {
	render:{
		returnIcon: string;
		[key:string]:string
	}
	returnCallback: ()=>void;

}

export default class SettingsHead extends Block {
	props:Props;
	constructor(props: Props,  classList: string,parent:string='',) {
		super(props,'div', parent, template, `nav-search ${classList}`);
	}

	componentDidMount() {
		const returnCallback = this.props.returnCallback ? this.props.returnCallback : () => {
			console.log('click on cog button')
		};
		this._element?.addEventListener('click', event => {
			event.preventDefault();
			const returnIcon = this.props.render.returnIcon ? this.props.render.returnIcon : 'icon';
			if ((<Element>event.target).classList.contains(returnIcon))
				returnCallback();
		});
	}

	render(): string {
		let element = this.compile(this.template);
		return element(this.props.render);
	}
}