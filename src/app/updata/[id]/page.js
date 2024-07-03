'use client';
import { useParams, useRouter } from "next/navigation";  // 앱라우터는 next/navigation에서 가져와야 함
import { useEffect, useState } from "react";

 // 클라이언트 컴포넌트로 지정

export default function Updata() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();  // 클라이언트 컴포넌트에서만 사용가능
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + `topics/` + id)
      .then(resp => resp.json())
      .then(result => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const body = e.target.body.value;
    
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, body})
    }

    fetch(`http://localhost:9999/topics/` + id, options)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const lastId = result.id;
        router.refresh();
        // 라우터로 방금 생긴 글로 리디렉션 가능
        // router.push(`/read/${lastId}`);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>
          <input 
            type="text" 
            name="title" 
            placeholder="title"  
            value={title} 
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea 
            name="body" 
            placeholder="body" 
            value={body} 
            onChange={e => setBody(e.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="create" />
        </p>
      </form>
      {/* <img src="/next.svg"></img> */}
    </div>
  );
}
