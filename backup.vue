      async initContent(sectionId) {
        console.log('init')
        wx.showToast({ title: '加载中',icon:'loading'})

        this.sectionId = sectionId;
        this.notFirst = true;
        this.notLast = true;

        console.log(this.book)
        let sectionRes = await get(config.getContentById(sectionId));
        this.section = sectionRes.section[0];
        this.section.sectionContent = this.section.sectionContent.replace(/[\r|\n][\r|\n]/gm, '\n');


        this.sectionIds = this.book.sectionArray.split(",");
        console.log('cont')
        console.log(this.sectionIds);
        let len = this.sectionIds.length;
        if (this.sectionIds[0] == sectionId) {
            this.notFirst = false;
          }
          if (this.sectionIds[len-1] == sectionId) {
            this.notLast = false;
          }
      },
