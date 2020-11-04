class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      const req = await fetch(url);
      const json = await req.json();
      return json;
    } catch (e) {
      console.error('http get method error', e);
      throw Error(e);
    }
  };

  post = async (url, body) => {
    try {
      const req = await fetch(url, {
        method: 'POST',
        body,
      });
      const json = await req.json();
      return json;
    } catch (e) {
      console.error('http mehtod post error', e);
      throw Error(e);
    }
  };

  PUT = async (url, body) => {
    try {
      const req = await fetch(url, {
        method: 'PUT',
        body,
      });
      const json = await req.json();
      return json;
    } catch (e) {
      console.error('http mehtod post error', e);
      throw Error(e);
    }
  };

  remove = async (url) => {
    try {
      const req = await fetch(url, {
        method: 'DELETE',
      });
      const json = await req.json();
      return json;
    } catch (e) {
      console.error('http mehtod post error', e);
      throw Error(e);
    }
  };
}

export default Http;
