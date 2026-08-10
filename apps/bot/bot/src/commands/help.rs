use serenity::all::{Colour, CommandInteraction, Context, CreateCommand, CreateEmbed, CreateEmbedFooter, CreateInteractionResponse, CreateInteractionResponseMessage, Timestamp};

pub async fn run(
    ctx: &Context,
    command: &CommandInteraction,
) {
  let message = CreateEmbed::new()
    .title("Comandos disponíveis")
    .description("Aqui estão os comandos disponíveis para você")
    .color(Colour::new(0x00FF00))
    .field("Commands", "/ping - Check the bot's latency\n/help - Show this help message", false)
    .field("name", "value", false)
                    .timestamp(Timestamp::now()).footer(CreateEmbedFooter::new("Comando de help"));
  command.create_response(ctx, CreateInteractionResponse::Message(CreateInteractionResponseMessage::new().embed(message)))
    .await
    .unwrap();
}


pub fn register() -> CreateCommand {
    CreateCommand::new("help").description("A help command")
}