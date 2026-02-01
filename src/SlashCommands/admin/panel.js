const { SlashCommandBuilder, ContainerBuilder, MediaGalleryBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { UrlImage, ColoreEmbd} = require("../../../config.json")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("إرسال لوحة التشفير"),

    async execute(interaction, client) {
        const bannerGallery = new MediaGalleryBuilder()
            .addItems((item) => 
                item
                    .setURL(UrlImage)
            );
        const embedColor = parseInt(ColoreEmbd, 16);
        const mainContainer = new ContainerBuilder()

        
            .setAccentColor(embedColor)         
            .addTextDisplayComponents((text) =>
                text.setContent("**Demon Network™ Blade Your Post • شفر منشورك**")
            )

            .addTextDisplayComponents((text) =>
                text.setContent("عزيزي البائع، لتشفير منشورك اضغط على الزر في الأسفل")
            )
            
            .addMediaGalleryComponents(bannerGallery)

            .addSeparatorComponents((separator) => separator)

            .addSectionComponents((section) =>
                section
                    .addTextDisplayComponents((text) => 
                        text.setContent("اضغط هنا لبدء عملية التشفير آمنة:")
                    )
                    .setButtonAccessory((btn) =>
                        btn.setCustomId('tchfir_btn')
                           .setLabel('تشفير المنشور')
                           .setStyle(ButtonStyle.Success)
                    )
            );

        await interaction.channel.send({
        components: [mainContainer],
        flags: [MessageFlags.IsComponentsV2]
        });
    },
};