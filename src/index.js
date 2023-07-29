import {req, res} from "enconvo/bridge";

(async () => {
    try {
        const {options} = req.body()

        console.log(JSON.stringify(options))

        const result = await $OCR.screenShotOcr()
        $display.showMainWindow("", {})

        if (options.auto_copy === "true") {
            $clipboard.setString(result)
        }

        await res.text(result);
    } catch (e) {
        throw e;
    }
})().catch((err) => {
    console.log("error: " + err.message);
    res.error(JSON.parse(err).error.message || '未知错误')
});


