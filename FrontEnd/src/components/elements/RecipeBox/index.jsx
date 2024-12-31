import "./index.css"
export function RecipeBox(props) {
    return (
        <>
            <div className="hold">
                <img src={props.image} />
                <br />
                <p>{props.title}</p>
            </div>
        </>
    )
}