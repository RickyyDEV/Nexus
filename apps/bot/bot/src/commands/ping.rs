use serenity::all::{
    CommandInteraction, Context, CreateCommand, CreateInteractionResponse, CreateInteractionResponseMessage,
};

pub async fn run(
    ctx: &Context,
    command: &CommandInteraction,
) {
    println!("Recebi /ping");

    if let Err(err) = command
        .create_response(
            ctx,
            CreateInteractionResponse::Message(
                CreateInteractionResponseMessage::new()
                    .content("🏓 Pong!"),
            ),
        )
        .await
    {
        println!("Erro: {err:?}");
    }
}


pub fn register() -> CreateCommand {
    CreateCommand::new("ping").description("A ping command")
}