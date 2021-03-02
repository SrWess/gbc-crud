import { XMLHttpRequest } from 'xmlhttprequest-ts';
// import xml2js from 'xml2js';

interface zipCodeProps {
	cep: string;
  logradouro: string;
  bairro: string;
  complemento: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export default function findCep(zipCode: string) {
	return new Promise<zipCodeProps>((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		let url = `https://viacep.com.br/ws/${zipCode}/json/`;

		xhr.open('GET', url);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve(JSON.parse(xhr.responseText));
			}
		};
		
		xhr.send();
	});
}
