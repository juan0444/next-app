// 정보를 출력할 뿐이니까 서버 컴포넌트로 

export default async function Read(props) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, { cache: 'no-store' });
  const topic = await resp.json();

  return (
    <div>
      <h2>{topic.title}</h2>
      {topic.body}
      {/* params : {props.params.id} */}
    </div>
  );
}