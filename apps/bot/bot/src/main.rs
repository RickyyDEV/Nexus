use serenity::{all::{Command, Interaction}, async_trait, model::gateway::Ready, prelude::*};
use songbird::SerenityInit;
mod commands;
struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, _: Ready) {
        Command::set_global_commands(
            &ctx.http,
            vec![
                commands::ping::register(),
                commands::help::register(),
            ],
        )
        .await
        .unwrap();
        println!("Comandos registrados!");
    }
        async fn interaction_create(
        &self,
        ctx: Context,
        interaction: Interaction,
    ) {

        if let Interaction::Command(command) = interaction {

        match command.data.name.as_str() {

                "ping" => {
                    commands::ping::run(
                        &ctx,
                        &command,
                    )
                    .await;
                }
                "help" => {
                    commands::help::run(
                        &ctx,
                        &command,
                    )
                    .await;
                }
                _ => {},
            };
        }
    }
    async fn message(&self, ctx: Context, msg: serenity::model::channel::Message) {
        if msg.content == "!ping" {
            if let Err(why) = msg.channel_id.say(&ctx.http, "Pong!").await {
                println!("Erro enviando mensagem: {:?}", why);
            }
        }
    }
}

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    let token = std::env::var("DISCORD_TOKEN").expect("DISCORD_TOKEN não encontrado");
    println!("Token encontrado: {}", token);

    // let intents =
    // GatewayIntents::GUILD_MESSAGES |
    // GatewayIntents::GUILD_VOICE_STATES |
    // GatewayIntents::GUILDS |
    // GatewayIntents::MESSAGE_CONTENT;

    let mut client = Client::builder(token, GatewayIntents::empty())
        .event_handler(Handler)
        .register_songbird()
        .await
        .expect("Erro criando cliente");

    client.start().await.expect("Erro iniciando bot");
}
