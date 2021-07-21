from alive import keep_alive
import os
import discord
from discord.ext import commands,tasks

discord_token = os.environ['discord_secret_key']

intents = discord.Intents.all()
intents.members = True
client = commands.Bot(command_prefix = '.',intents=intents)
client.remove_command("help")

@client.event
async def on_ready():
    print('bot is running..')
    await get_updates(client)


@tasks.loop(seconds=120)
async def change_status():
    await bot.change_presence(activity=discord.Game(next(status)))

keep_alive()

client.run(discord_token)
